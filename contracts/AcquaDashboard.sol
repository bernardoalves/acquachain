// SPDX-License-Identifier: No License (None)
pragma solidity >=0.7.0 <0.8.0;
pragma abicoder v2;

import "./AcquaToken.sol";

contract AcquaDashboard {
    address public governmentAddress;
    address[] public companies;
    mapping(address => int) public remaining;
    mapping(address => SensorData[]) public companyToSensorData;
    mapping(string => SensorData[]) public sensorIDToSensorData;
    mapping(string => uint) public sitesToBenchmark;

    AcquaToken acquaToken;

    struct SensorData {
        string sensorID;
        string siteID;
        uint value;
        Unit unit;
    }

    enum Unit {
        LITERS,
        METER3
    }

    event PushData(address indexed company, string sensorID, string message);

    constructor(
        address _acquaAddress,
        address _government,
        string[] memory _sites,
        uint[] memory _benchmarks
    ) {
        for (uint i = 0; i < _benchmarks.length; i++) {
            sitesToBenchmark[_sites[i]] = _benchmarks[i];
        }
        acquaToken = AcquaToken(_acquaAddress);
        governmentAddress = _government;
    }

    function pushData(
        string memory _sensorID,
        string memory _siteID,
        uint _value,
        string memory _unit
    ) external returns (bool) {
        require(bytes(_sensorID).length > 0, "Sensor ID data cannot be NULL");
        require(bytes(_siteID).length > 0, "Site ID data cannot be NULL");
        require(bytes(_unit).length > 0, "Unit data cannot be NULL");

        Unit unitStruct;
        if (compareStrings(_unit, "liters")) {
            unitStruct = Unit.LITERS;
        } else {
            unitStruct = Unit.METER3;
        }

        SensorData memory sensorData;
        sensorData.sensorID = _sensorID;
        sensorData.siteID = _siteID;
        sensorData.value = _value;
        sensorData.unit = unitStruct;

        companies.push(msg.sender);
        companyToSensorData[msg.sender].push(sensorData);
        sensorIDToSensorData[_sensorID].push(sensorData);

        mintTokens(msg.sender, _value, sitesToBenchmark[_siteID]);

        emit PushData(msg.sender, _sensorID, "Sensor data added!");
        return true;
    }

    function mintTokens(
        address company,
        uint _value,
        uint _benchmark
    ) internal {
        if (_value < _benchmark) {
            remaining[company] += int(_benchmark - _value);
        } else {
            remaining[company] -= int(_value - _benchmark);
        }

        if (remaining[company] >= int(_benchmark)) {
            uint numTokens = (uint(remaining[company]) / _benchmark);
            acquaToken.mint(msg.sender, numTokens * 1e18);
            remaining[company] -= int(numTokens * _benchmark);
        }
    }

    function pullDataByCompany(
        address _companyAddress
    ) external view returns (SensorData[] memory) {
        return companyToSensorData[_companyAddress];
    }

    function pullDataBySensorID(
        string memory _sensorID
    ) external view returns (SensorData[] memory) {
        return sensorIDToSensorData[_sensorID];
    }

    function transferGovernment(uint _amount) external returns (bool) {
        require(_amount > 0, "Amount not valid");
        acquaToken.transfer(_amount, msg.sender, governmentAddress);
        return true;
    }

    function compareStrings(
        string memory a,
        string memory b
    ) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }
}
