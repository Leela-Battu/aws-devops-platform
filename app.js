const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
res.send(`         <h1>My DevOps Application</h1>         <p>Node.js application is running successfully!</p>         <p>Deployed using Docker, Jenkins, Terraform, Ansible, and AWS.</p>
    `);
});

app.get('/health', (req, res) => {
res.status(200).json({
status: 'healthy',
application: 'aws-devops-platform'
});
});

app.get('/version', (req, res) => {
res.json({
version: '1.0.0'
});
});

app.listen(PORT, '0.0.0.0', () => {
console.log(`Application running on port ${PORT}`);
});
