//db 서버

//API 호출: RunInstances
{
  "MaxCount": 1,
  "MinCount": 1,
  "ImageId": "ami-09a7535106fbd42d5",
  "InstanceType": "t2.micro",
  "EbsOptimized": false,
  "BlockDeviceMappings": [
    {
      "DeviceName": "/dev/sda1",
      "Ebs": {
        "Encrypted": false,
        "DeleteOnTermination": true,
        "SnapshotId": "snap-0e43c3eefca073953",
        "VolumeSize": 30,
        "VolumeType": "gp2"
      }
    }
  ],
  "NetworkInterfaces": [
    {
      "AssociatePublicIpAddress": true,
      "DeviceIndex": 0,
      "Groups": [
        "<groupId of the new security group created below>"
      ]
    }
  ],
  "TagSpecifications": [
    {
      "ResourceType": "instance",
      "Tags": [
        {
          "Key": "Name",
          "Value": "minimini"
        }
      ]
    }
  ],
  "MetadataOptions": {
    "HttpEndpoint": "enabled",
    "HttpPutResponseHopLimit": 2,
    "HttpTokens": "required"
  },
  "PrivateDnsNameOptions": {
    "HostnameType": "ip-name",
    "EnableResourceNameDnsARecord": true,
    "EnableResourceNameDnsAAAARecord": false
  }
}

//API 호출: CreateSecurityGroup
[text](c:/Users/user/Downloads)

{
  "GroupName": "launch-wizard-2",
  "Description": "launch-wizard-2 created 2024-04-07T20:12:27.029Z",
  "VpcId": "vpc-093f4103d574f4ed5"
}

//API 호출: AuthorizeSecurityGroupIngress
{
  "GroupId": "<groupId of the security group created above>",
  "IpPermissions": [
    {
      "IpProtocol": "tcp",
      "FromPort": 22,
      "ToPort": 22,
      "IpRanges": [
        {
          "CidrIp": "0.0.0.0/0"
        }
      ]
    },
    {
      "IpProtocol": "tcp",
      "FromPort": 80,
      "ToPort": 80,
      "IpRanges": [
        {
          "CidrIp": "0.0.0.0/0"
        }
      ]
    },
    {
      "IpProtocol": "tcp",
      "FromPort": 443,
      "ToPort": 443,
      "IpRanges": [
        {
          "CidrIp": "0.0.0.0/0"
        }
      ]
    }
  ]
}
