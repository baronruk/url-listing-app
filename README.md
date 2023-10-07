# Url Listing App

## Installing the app

### Prerequisites

- Node.js: ^18.17.1

### Installation

1. To install the server, navigate to the root directory of the application and execute the following commands:

``` sh
cd server
npm install
```

2. When the installation process is completed, run the following command:

``` sh
node index.js
```

3. Open the browser of your choice and navigate to the following URL, or [click here](http://localhost:1337/):

```
http://localhost:1337/
```

---

## Adding the app as a new service to ``systemctl`` (optional)

1. ### Create a Service Unit File:

	Service unit files are typically stored in the /etc/systemd/system/ directory. 
	You'll need to create a .service file for your service with the appropriate configuration. 
	Run the following command to create the service unit file:

	```sh
	sudo nano /etc/systemd/system/url-listing-app.service
	```

	In the text editor, add the configuration for your service. Example:

	```
	[Unit]
	Description=Project Urls App

	[Service]
	ExecStart=/usr/bin/node /path/to/app/url-listing-app/server/index.js
	WorkingDirectory=/path/to/app/url-listing-app/server
	Restart=always
	RestartSec=10
	StandardOutput=syslog
	StandardError=syslog
	SyslogIdentifier=url-listing-app

	[Install]
	WantedBy=multi-user.target
	```

	Customize the ``Description``, ``ExecStart``, and other options according to your service's requirements.

2. ### Reload systemd Manager:
	
	After creating or modifying the service unit file, reload the systemd manager to make it aware of the changes:

	``` sh
	sudo systemctl daemon-reload
	```

3. ### Enable and Start the Service:

	Once the service unit file is created and systemd has been reloaded, enable and start the service:

	``` sh
	sudo systemctl enable url-listing-app.service
	sudo systemctl start url-listing-app.service
	```

	The ``enable`` command ensures that the service will start automatically on system boot, 
	and the ``start`` command starts the service immediately.

4. ### Manage the Service:
	You can use various systemctl commands to manage the service:

	- To stop the service: 
		
		``` sh
		sudo systemctl stop url-listing-app.service
		```
	
	- To restart the service: 
		
		``` sh
		sudo systemctl restart url-listing-app.service
		```

	- To disable the service (prevent it from starting on boot): 
		
		``` sh
		sudo systemctl disable url-listing-app.service
		```

	[Official systemd documentation](https://www.freedesktop.org/software/systemd/man/systemd.service.html)

## Favicon

[Source](https://icon-icons.com/pack/Files-and-Folders---Filled-line/3456)
