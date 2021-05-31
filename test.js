process.stdin.resume();
process.stdin.setEncoding('ascii');

let commandResults = ['root/'];
let currentIndex = 0;

const MSG = {
    UNRECOGNIZED_COMMAND: 'Unrecognized Command was entered',
    INVALID_COMMAND: 'Invalid Command was entered',
    INVALID_FILE_FOLDERNAME: 'Invalid File or Folder Name',
    DIRECTORY_ALREADY_EXISTS: 'Directory already exists',
    DIRECTORY_NOT_FOUND: 'Directory not found'
};

const shellActions = {
    quit: endApplication,
    pwd: showFullPath,
    ls: showDirectoryAndSubDirectory,
    mkdir: createDirectory,
    cd: changeDirectory,
    touch: createFile
};

function executeCommands(command) {
    const commandSplited = command.trim().split(' ');
    const commandName = commandSplited[0].toLowerCase();
    const commandParameters = commandSplited[1];

    if (commandName.trim().length > 0) {
        const executeAction = shellActions[commandName];
        executeAction
            ? executeAction(commandParameters)
            : console.log(`[${commandName}]`, MSG.UNRECOGNIZED_COMMAND);
    }
}

// -------------- functions command shell ----------------------------
function endApplication() {
    console.log('Thanks to use this Command Line Shell :) ');
    readline.close();
}

function showFullPath() {
    const currentFullPathDirectory = commandResults[currentIndex];
    console.log(currentFullPathDirectory);
}

function showDirectoryAndSubDirectory(isRecursive) {
    const currentPath = commandResults[currentIndex];
    const pathSorted = [...commandResults];
    pathSorted.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    if (isRecursive) {
        if (isRecursive !== '-r') console.log(MSG.INVALID_COMMAND);
        else {
            // show all current directory and all subdirectories
            pathSorted.forEach((path) => {
                if (path.indexOf(currentPath) >= 0) {
                    if (path.split('')[path.length - 1] !== '/') {
                        // file
                        const pathSplited = path.split('/');
                        const fileName = pathSplited[pathSplited.length - 1];
                        console.log(`... |- ${fileName}`);
                    } else {
                        // directory
                        console.log(`...${path}`);
                    }
                }
            });
        }
    } else {
        // just current directory (not subdirectories)
        const currentPathLength = currentPath.split('/').length;
        pathSorted.forEach((path) => {
            if (path.indexOf(currentPath) >= 0) {
                if (path.split('/').length === currentPathLength)
                    console.log(`...${path}`);
            }
        });
    }
}

function createDirectory(dirName) {
    const validation = () => {
        let result = true;
        if (dirName.trim().length > 100) {
            console.log(MSG.INVALID_FILE_FOLDERNAME);
            result = false;
        } else {
            let alreadyExist = commandResults.some(
                (cmdResult) => cmdResult.indexOf(dirName) >= 0
            );
            if (alreadyExist) {
                console.log(MSG.DIRECTORY_ALREADY_EXISTS);
                result = false;
            }
        }

        return result;
    };

    validation() &&
        (() => {
            const pathWithNewDirectory = `${commandResults[currentIndex]}${dirName}/`;
            commandResults.push(pathWithNewDirectory);
        })();
}

function changeDirectory(dirName) {
    // dirName : the name of the SUB-DIRECTORY to change current path to
    const currentPath = commandResults[currentIndex];
    if (dirName === '..') {
        if (currentIndex > 0) {
            const pathSplited = currentPath.split('/');
            const directoryRemove = pathSplited[pathSplited.length - 2];
            const newCurrentPath = currentPath.replace(
                `${directoryRemove}/`,
                ''
            );
            currentIndex = commandResults.findIndex(
                (path) => path === newCurrentPath
            );
        }
    } else {
        const newCurrentPath = `${currentPath}${dirName}/`;
        const newCurrentIndex = commandResults.findIndex(
            (path) => path === newCurrentPath
        );

        if (newCurrentIndex === -1) console.log(MSG.DIRECTORY_NOT_FOUND);
        else currentIndex = newCurrentIndex;
    }
}

function createFile(fileName) {
    // limit 100
    if (fileName.trim().length > 100) console.log(MSG.INVALID_FILE_FOLDERNAME);
    else {
        const newFile = `${commandResults[currentIndex]}${fileName}`;
        commandResults.push(newFile);
    }
}

// ------------------------------- MAIN ------------------------------
console.log('[ SALESFORCE ] GUSTAVO LOPEZ | test ');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.setPrompt('> ');
readline.prompt(true);

readline
    .on('line', (chunk) => {
        executeCommands(chunk);
        readline.prompt();
    })
    .on('close', () => {
        console.log('COMMANDS RESULTS : ', commandResults);
        process.exit(0);
    });
