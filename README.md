live demo [here](http://itscreate.meteor.com/)

## Before you start

Grab Meteor

```
curl https://install.meteor.com | /bin/sh
```

Grab Meteorite

```
npm install -g meteorite
```

## Settings

Create modules with application settings

```
touch settings.json
touch settings.production.json
``` 

Use the following template for the settings modules 

```
{
	"facebook" : {
		"appId": "facebook-application-id",
		"secret": "facebook-application-secret"
	}
}
```

## Running locally

```
mrt --settings settings.json
```
## Deploy

```
mrt deploy your-app-name.meteor.com  --settings settings.production.json
```