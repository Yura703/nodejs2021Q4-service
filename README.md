### [Yuri Lapitski](lyurik@tut.by)
# RS School REST service
# Docker basics

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Dowload Docker](https://www.docker.com/)

## Downloading

```
git clone {repository URL}
```
## Switch to task

```
git checkout Docker-basics
```
## Installing NPM modules

```
npm install
```

## Start docker-compose

```
docker-compose up
```

## Docker
To start the aplication and postgres use the command
```
docker-compose up
```
To stop use Ctrl+C  (thrice)

Viewing images
```
docker images
```

Viewing containers
```
  docker ps
```

Stop all containers
```
docker stop $(docker ps -a -q)
```

Delete all containers
```
docker rm $(docker ps -a -q)
```

Delete all images
```
docker system prune -a
or
docker rmi $(docker images -q)
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
