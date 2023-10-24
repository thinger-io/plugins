
# SFTPGo

<p align="center">
  <img src="/plugins/sftpgo/assets/sftpgo-logo.png" onerror="this.src='https://marketplace.thinger.io/plugins/sftpgo/assets/sftpgo-logo.png';this.onerror='';" alt="Prometheus logo">
</p>

[SFTPGo](https://sftpgo.com/) extends capabilities of File Storages, adding support for SFTP, FTP and FTPS with individual user management. With this plugin you can leverage Thinger.io file storage backends for exchanging and storing files on the platform.

## Get Started

SFTPGo has two different Web UIs, separated by admin and client users. To access them, as usually after installation, a new option will appear under the Plugins section on the left toolbar to acess SFTPGo.

When loaded, the WebClient will appear, but before being able to login with a user, we should login with the admin.

<p align="center">
  <img src="/plugins/sftpgo/assets/webclient-login.png" onerror="this.src='https://marketplace.thinger.io/plugins/sftpgo/assets/webclient-login.png';this.onerror='';" alt="SFTPGo WebClient marking how to access the WebAdmin">
</p>

Click on the WebAdmin link and enter as username and password your Thinger.io username.

<p align="center">
  <img src="/plugins/sftpgo/assets/webadmin-login.png" onerror="this.src='https://marketplace.thinger.io/plugins/sftpgo/assets/webadmin-login.png';this.onerror='';" alt="SFTPGo WebAdmin login">
</p>

!!! important

    It is highly recommended to change the admin password to the same of the Thinger.io account or to one of your choice.

## Creating Users

Just after a login in with the admin user, the users management menu appears. In this menu, users for transfering data may be created by following two different approaches for their shared data.

### Use a subdirectory of a common file storage

When installing this plugin, a new file storage was created in Thinger.io with the id 'sftpgo\_data', this storage may be used for SFTPGo backups and users data, so no home directory will need to be specified when creating the user, and any new files added will be added under the file storage 'sftpgo\_data', in the path `/data/<username>`.

We can then upload an example file and if we go to said file storage we will see the file structure.

<p align="center">
  <img src="/plugins/sftpgo/assets/sftpgo-common-storage.png" onerror="this.src='https://marketplace.thinger.io/plugins/sftpgo/assets/sftpgo-common-storage.png';this.onerror='';" alt="File storage screen when using a common storage for data in SFTPGo">
</p>

### User an already created file storage

When creating a user to share the files of an already existing file storage, the home directory of the new user needs to be specified.

All storages will be mounted in `/srv/sftpgo/`, and to that path we would need to append the id of our storage. Example in the below screen.

<p align="center">
  <img src="/plugins/sftpgo/assets/sftpgo-dedicated-storage.png" onerror="this.src='https://marketplace.thinger.io/plugins/sftpgo/assets/sftpgo-dedicated-storage.png';this.onerror='';" alt="SFTPGo Add user with dedicated storage">
</p>

## Establish a Connection

### SFTP

SFTP protocol should be the prefered option to use due to various reasons like its security, firewall friendliness and consistency.

In order to connect with this protocol, the connection parameters are:

- Hostname: hostname of the Thinger.io instance or public IP
- Port: 2022
- Credentials: user and password for a created user

### FTP and FTPS

!!! warning

    It is recommended to always use SFTP protocol due to the design challenges of FTP/S

For FTP and FTP over TLS (FTPS) the supported connection is in Passive Mode. The upgrade to TLS of the control and data ports may be handled automatically by the FTP client using explicit FTP.

!!! tip

    Currently, only one data connection may be opened simultaneously

The connection parameters are:

- Hostname: hostname of the Thinger.io instance or public IP
- Port: 2021
- Credentials: user and password for a created user

On connection with an explicit FTP over TLS, the secure connection will be upgraded on both control and data ports.

This plugin only supports the TLS connection over the base domain name of the instance.

!!! warning

    If the TLS connection is not longer able to be established, restart the plugin manually in order for the certificates to reload

## Official Documentation

This plugin is based on the software SFTPGo. It's official documentation can be found under the [docs folder](https://github.com/drakkan/sftpgo/tree/main/docs) in its [official repository](https://github.com/drakkan/sftpgo).

## License

SFTPGo is distributed under the [AGPL-3.0 License](https://github.com/drakkan/sftpgo/blob/main/LICENSE)
