# Node.js Utility Package

A versatile Node.js utility package designed to simplify common development tasks, from logging and string manipulation to file system operations and authentication.

## Installation

To install the package, use the following command:

```bash
npm i nodejs-utility-package
```

## Features

### 1. JWT Authentication Utilities

- Configure and use JWT for authentication:

```javascript
const { jwtAuthUtils } = require("nodejs-utility-package");

const jwtAuth = new jwtAuthUtils();
jwtAuth.config("your_secret_key", "24h");

const token = jwtAuth.setUser({ name: "User" });
console.log(token);

try {
    const user = jwtAuth.getUser(token);
    console.log(user);
} catch (error) {
    console.log("Token expired or invalid.");
}
```

- Middleware for route protection:

```javascript
const express = require("express");
const app = express();
const router = express.Router();

router.post(
    "/isLoggedIn",
    jwtAuth.restrictToLoggedInUserOnly,
    (req, res) => {
        res.json("User is logged in.");
    }
);

app.use("/api", router);
app.listen(8000, () => console.log("Server running on port 8000"));
```

### 2. Validation Utilities

- Validate email addresses:

```javascript
const { validationUtils } = require("nodejs-utility-package");
console.log(validationUtils.isValidEmail("example@gmail.com"));
```

### 3. String Utilities

- Perform string transformations and analysis:

```javascript
const { stringUtils } = require("nodejs-utility-package");
console.log(stringUtils.toCamelCase("hello world"));
console.log(stringUtils.toSnakeCase("hello world"));
console.log(stringUtils.reverseString("example"));
console.log(stringUtils.isPalindrome("madam"));
```

### 4. CLI Utilities

- Display styled CLI messages:

```javascript
const { cliUtils } = require("nodejs-utility-package");
cliUtils.logSuccess("Operation successful");
cliUtils.logError("An error occurred");
```

### 5. Logging Utilities

- Log messages to a file:

```javascript
const { loggingUtils } = require("nodejs-utility-package");
loggingUtils.logInfo("Information message");
loggingUtils.logError("Error message");
```

### 6. Cryptography Utilities

- Generate hashes for secure storage:

```javascript
const { cryptoUtils } = require("nodejs-utility-package");
console.log(cryptoUtils.sha256("password"));
console.log(cryptoUtils.sha512("password"));
```

### 7. HTTP Status Code Utilities

- Handle HTTP status codes:

```javascript
const { httpStatusCodesUtils } = require("nodejs-utility-package");
console.log(httpStatusCodesUtils.HTTP_STATUS_CODES.OK);
console.log(httpStatusCodesUtils.getStatusCode("ok"));
```

### 8. File System Utilities

- Perform file system operations:

```javascript
const { fileSystemUtils } = require("nodejs-utility-package");
fileSystemUtils.writeFile("test.txt", "Hello, World!")
    .then(() => console.log("File written successfully."))
    .catch(err => console.log(err));
```

### 9. Environment Utilities

- Manage environment variables:

```javascript
const { envUtils } = require("nodejs-utility-package");
console.log(envUtils.getEnvVariable("NODE_ENV"));
```

### 10. Date Utilities

- Work with time zones and dates:

```javascript
const { dateUtils } = require("nodejs-utility-package");
console.log(dateUtils.getAllTimeZones());
console.log(dateUtils.convertTimeZone(new Date()));
```

## Contributions

We welcome contributions! Please submit a pull request or report issues on the GitHub repository.

## License

This package is open-sourced under the MIT License.
