const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My DevOps Application</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #263449;
        }

        nav {
            background: #17365d;
            color: white;
            padding: 20px 8%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav h2 {
            font-size: 22px;
        }

        nav span {
            color: #dce8f5;
            font-size: 14px;
        }

        .container {
            max-width: 1050px;
            margin: 50px auto;
            padding: 20px;
        }

        .welcome {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 3px 12px rgba(0,0,0,0.05);
            margin-bottom: 25px;
        }

        .welcome h1 {
            color: #17365d;
            margin-bottom: 15px;
        }

        .welcome p {
            color: #667085;
            line-height: 1.7;
        }

        .status {
            display: inline-block;
            margin-top: 22px;
            padding: 10px 16px;
            background: #e7f8ed;
            color: #16803c;
            border-radius: 25px;
            font-size: 14px;
            font-weight: bold;
        }

        .section-title {
            margin: 30px 0 18px;
            color: #17365d;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 18px;
        }

        .card {
            background: white;
            padding: 25px 15px;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0 3px 12px rgba(0,0,0,0.05);
        }

        .card h3 {
            color: #17365d;
            margin-bottom: 9px;
        }

        .card p {
            font-size: 13px;
            color: #667085;
        }

        footer {
            text-align: center;
            padding: 25px;
            color: #7b8794;
            font-size: 13px;
            margin-top: 35px;
        }

        @media (max-width: 600px) {
            nav {
                padding: 18px 5%;
            }

            .container {
                margin: 20px auto;
            }

            .welcome {
                padding: 25px;
            }

            .welcome h1 {
                font-size: 25px;
            }
        }
    </style>
</head>

<body>

    <nav>
        <h2>My DevOps Application</h2>
        <span>AWS Cloud Deployment</span>
    </nav>

    <main class="container">

        <section class="welcome">
            <h1>Welcome to My DevOps Project</h1>

            <p>
                This Node.js application demonstrates automated
                application deployment using modern DevOps tools
                and AWS cloud infrastructure.
            </p>

            <div class="status">
                ● Application Running Successfully
            </div>
        </section>

        <h2 class="section-title">Technologies Used</h2>

        <section class="cards">

            <div class="card">
                <h3>AWS</h3>
                <p>Cloud Infrastructure</p>
            </div>

            <div class="card">
                <h3>Docker</h3>
                <p>Application Containerization</p>
            </div>

            <div class="card">
                <h3>Jenkins</h3>
                <p>CI/CD Automation</p>
            </div>

            <div class="card">
                <h3>Terraform</h3>
                <p>Infrastructure as Code</p>
            </div>

            <div class="card">
                <h3>Ansible</h3>
                <p>Configuration Management</p>
            </div>

        </section>

    </main>

    <footer>
        Built with Node.js | Deployed using AWS and DevOps Tools
    </footer>

</body>
</html>
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
