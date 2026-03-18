# 🏗️ Jenko

> A CLI-based DevOps tool that automates multi-tenant Jenkins management — team isolation, pipeline creation, job listing, and build triggering via REST APIs.

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-LTS-D24939?style=flat-square&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)


---

## 👤 Project Information

| Field | Details |
|---|---|
| **Student Name** | `Satvik Porwal` |
| **Registration No.** | `23FE10CSE00365` |
| **Course** | CSE3253 DevOps [PE6] |
| **Semester** | VI (2025–2026) |
| **Project Type** | Jenkins & CI/CD Automation |
| **Difficulty** | Intermediate |

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Testing](#-testing)
- [Monitoring & Logging](#-monitoring--logging)
- [Docker & Kubernetes](#-docker--kubernetes)
- [Performance Metrics](#-performance-metrics)
- [Documentation](#-documentation)
- [Demo](#-demo)
- [Development Workflow](#-development-workflow)
- [Security](#-security)
- [Contributing](#-contributing)
- [Faculty Assessment](#-faculty-assessment)

---

## 📖 Project Overview

### Problem Statement

Managing Jenkins manually across multiple teams is inefficient and does not scale. Every time a new team is onboarded, a DevOps engineer must manually create folders, configure pipeline jobs, and manage access — all through the Jenkins UI. This process is:

- **Repetitive** — the same steps are performed for every team and every pipeline
- **Error-prone** — manual configuration through the UI leads to inconsistency
- **Not scalable** — as the number of teams grows, manual management becomes a bottleneck

### Solution

`jenkins-mt` provides a Command Line Interface (CLI) that communicates directly with the Jenkins REST API. Engineers can provision team namespaces, create pipelines, list jobs, and trigger builds without touching the Jenkins UI — making operations fast, consistent, and scriptable.

### Objectives

- Automate routine Jenkins operations via a developer-friendly CLI
- Enable multi-team isolation through folder-based namespacing in Jenkins
- Simplify and standardize CI/CD workflows across teams

### Key Features

| Feature | Status |
|---|---|
| 📁 Create team (Jenkins folder) | ✅ Implemented |
| 🔧 Create pipeline job inside team folder | ✅ Implemented |
| 📋 List all jobs within a team | ✅ Implemented |
| 🚀 Trigger builds via CLI | ✅ Implemented |
| 🐳 Dockerized Jenkins with persistent storage | ✅ Implemented |
| 🔌 REST API automation via Axios | ✅ Implemented |
| ❌ Delete team / pipeline | 🔜 Planned |
| ❌ Build log fetching | 🔜 Planned |
| ❌ Advanced CI/CD stages | 🔜 Planned |

---

## 🛠️ Technology Stack

### Core Technologies

| Category | Technology |
|---|---|
| **Programming Language** | Node.js 18.x |
| **CLI Framework** | Commander.js |
| **HTTP Client** | Axios |
| **Environment Config** | Dotenv |
| **Terminal Output** | Chalk |
| **Database** | None |

### DevOps Tools

| Category | Tool / Status |
|---|---|
| **Version Control** | Git |
| **CI/CD** | Jenkins LTS |
| **Containerization** | Docker & Docker Compose |
| **Orchestration** | Not implemented |
| **Configuration Management** | Not implemented |
| **Monitoring** | Not implemented |

---

## 📂 Project Structure

```
devops-project-jenkins-mt/
│
├── README.md
├── package.json
│
├── src/
│   ├── main/
│   │   ├── cli/
│   │   │   ├── index.js              # CLI entry point — registers all commands
│   │   │   ├── pipeline.js           # create-pipeline, list-jobs, trigger-build
│   │   │   └── team.js               # create-team command handler
│   │   │
│   │   ├── config/
│   │   │   └── config.js             # Loads and exports .env configuration
│   │   │
│   │   ├── services/
│   │   │   └── jenkinsService.js     # Jenkins REST API calls via Axios
│   │   │
│   │   └── utils/
│   │       └── logger.js             # Chalk-based console logging utility
│   │
│   ├── scripts/
│   │   ├── setup.sh                  # Initial Jenkins setup helper
│   │   ├── start.sh                  # Starts Docker Compose services
│   │   └── stop.sh                   # Stops Docker Compose services
│   │
│   └── test/
│       └── cli.test.js               # Unit tests for CLI commands
│
└── infrastructure/
    └── docker/
        └── docker-compose.yml        # Jenkins container and volume definition
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your system:

| Tool | Minimum Version | Check |
|---|---|---|
| Node.js | 18.x | `node --version` |
| npm | 9.x | `npm --version` |
| Docker | 24.x | `docker --version` |
| Docker Compose | 2.x | `docker compose version` |
| Git | Any | `git --version` |

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/[username]/devops-project-jenkins-mt.git
cd devops-project-jenkins-mt
```

**2. Install Node.js dependencies**

```bash
npm install
```

**3. Register the CLI globally**

```bash
npm link
```

**4. Configure environment variables**

```bash
cp .env.example .env
# Edit .env with your Jenkins credentials
```

---

### Start Jenkins

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

Or using the provided script:

```bash
bash src/scripts/start.sh
```

---

### Access Jenkins

Open your browser and navigate to:

```
http://localhost:8080
```

**Retrieve the initial admin password:**

```bash
docker exec <container-name> cat /var/jenkins_home/secrets/initialAdminPassword
```

Complete the Jenkins setup wizard and install recommended plugins. Then generate an API token via **Dashboard → [Username] → Configure → API Token**.

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root using the following template:

```env
JENKINS_URL=http://localhost:8080
JENKINS_USER=admin
JENKINS_TOKEN=your_api_token_here
```

| Variable | Description |
|---|---|
| `JENKINS_URL` | Base URL of the Jenkins instance |
| `JENKINS_USER` | Jenkins admin username |
| `JENKINS_TOKEN` | Jenkins API token (not the login password) |

> ⚠️ The `.env` file is excluded from version control via `.gitignore`. Never commit credentials.

---

### Key Configuration Files

| File | Purpose |
|---|---|
| `src/main/config/config.js` | Loads environment variables and exports them as a config object used across the application |
| `infrastructure/docker/docker-compose.yml` | Defines the Jenkins Docker service, port mapping (`8080:8080`), and persistent volume mount (`jenkins_home`) |

---

## 💻 Usage

### `create-team` — Create a Team Folder

```bash
jenkins-mt create-team <team-name>
```

```bash
jenkins-mt create-team dev-team
# ✅  Team folder 'dev-team' created successfully.
```

---

### `create-pipeline` — Create a Pipeline Job

```bash
jenkins-mt create-pipeline --team <team-name> --name <job-name>
```

```bash
jenkins-mt create-pipeline --team dev-team --name build-app
# ✅  Pipeline 'build-app' created under team 'dev-team'.
```

---

### `list-jobs` — List Jobs in a Team

```bash
jenkins-mt list-jobs --team <team-name>
```

```bash
jenkins-mt list-jobs --team dev-team
# 📋  Jobs in 'dev-team':
#     1. build-app
#     2. run-tests
```

---

### `trigger-build` — Trigger a Pipeline Build

```bash
jenkins-mt trigger-build --team <team-name> --job <job-name>
```

```bash
jenkins-mt trigger-build --team dev-team --job build-app
# 🚀  Build triggered for 'build-app' in team 'dev-team'.
```

---

### Command Reference

| Command | Flags | Description |
|---|---|---|
| `create-team <n>` | — | Creates a Jenkins folder for the team |
| `create-pipeline` | `--team`, `--name` | Creates a pipeline job inside a team folder |
| `list-jobs` | `--team` | Lists all jobs within a team folder |
| `trigger-build` | `--team`, `--job` | Triggers a build for a specific job |
| `--help` | — | Displays help for any command |
| `--version` | — | Displays the CLI version |

---

## 🔄 CI/CD Pipeline

Pipeline jobs in Jenkins are created dynamically via the `create-pipeline` CLI command rather than being pre-configured. Each pipeline follows these basic stages:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Install   │───▶│    Build     │───▶│     Test     │
│ npm install  │     │ lint / check │     │  npm test    │
└──────────────┘     └──────────────┘     └──────────────┘
```

| Stage | Description |
|---|---|
| **Install** | Installs project dependencies (`npm install`) |
| **Build** | Runs lint checks and compiles the project if applicable |
| **Test** | Executes unit tests via `npm test` |

> **Note:** Advanced CI/CD stages (deployment, artifact publishing, notifications) are not yet implemented and are listed under [Future Improvements](#-future-improvements).

---

## 🧪 Testing

Unit tests are located in `src/test/cli.test.js` and cover the core CLI command handlers.

**Run tests:**

```bash
npm test
```

| Test File | Scope |
|---|---|
| `cli.test.js` | Unit tests for `create-team`, `create-pipeline`, `list-jobs`, `trigger-build` |

> Integration tests and end-to-end test coverage against a live Jenkins instance are planned for a future release.

---

## 📊 Monitoring & Logging

### Logging

All CLI operations produce console output via `src/main/utils/logger.js`, a Chalk-based utility that formats messages with color-coded levels:

| Level | Color | Usage |
|---|---|---|
| `info` | Cyan | General operation output |
| `success` | Green | Successful API responses |
| `error` | Red | Failures and API errors |
| `warn` | Yellow | Warnings and edge cases |

### Monitoring

External monitoring tools (Prometheus, Grafana, ELK Stack) are **not implemented** in the current version. Jenkins' built-in build history and console output serve as the primary observability mechanism.

---

## 🐳 Docker & Kubernetes

### Docker

Jenkins runs as a Docker container with a persistent volume to retain configuration across restarts.

**Start services:**

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

**Stop services:**

```bash
docker compose -f infrastructure/docker/docker-compose.yml down
```

**View logs:**

```bash
docker logs <container-name>
```

**`docker-compose.yml` summary:**

```yaml
services:
  jenkins:
    image: jenkins/jenkins:lts
    ports:
      - "8080:8080"
    volumes:
      - jenkins_home:/var/jenkins_home

volumes:
  jenkins_home:
```

### Kubernetes

Kubernetes deployment is **not implemented** in the current version.

---

## 📈 Performance Metrics

| Metric | Value |
|---|---|
| **CLI startup time** | < 200ms |
| **API response time (create-team)** | ~300–600ms |
| **API response time (trigger-build)** | ~200–400ms |
| **Jenkins container startup time** | ~30–60 seconds |
| **Concurrent team operations** | Not benchmarked |

> Metrics are approximate, measured on a local development machine. Production performance will vary based on Jenkins instance resources.

---

## 📄 Documentation

| Document | Location | Description |
|---|---|---|
| **README.md** | Project root | Complete project documentation (this file) |
| **`.env.example`** | Project root | Environment variable reference template |
| **Inline comments** | `src/main/` | Code-level documentation throughout source files |

> Extended documentation (API reference, architecture decision records, deployment guides) is planned for future versions.

---

## 🎬 Demo

| Resource | Link |
|---|---|
| **Live Demo** | `[Link to be added]` |
| **Demo Video** | `[Link to be added]` |
| **Screenshots** | `[To be added]` |

---

## 🔀 Development Workflow

This project follows a simple Git-based development workflow:

```
main
 └── feature/<feature-name>     # New features
 └── fix/<bug-description>      # Bug fixes
 └── docs/<documentation-topic> # Documentation updates
```

**Typical flow:**

```bash
# 1. Create a feature branch
git checkout -b feature/delete-team

# 2. Make changes and commit
git add .
git commit -m "feat: add delete-team command"

# 3. Push and open a pull request
git push origin feature/delete-team
```

All changes to `main` should go through a pull request with at least a brief description of what was changed and why.

---

## 🔐 Security

| Measure | Implementation |
|---|---|
| **API Token Authentication** | All Jenkins REST API calls use HTTP Basic Auth with a user-generated API token |
| **Environment Variables** | Credentials stored in `.env` — never hardcoded in source |
| **`.gitignore`** | `.env` is excluded from version control |
| **No privilege escalation** | CLI operates with the permissions of the configured Jenkins user only |

> For production use, consider storing secrets in a secrets manager (e.g., HashiCorp Vault, AWS Secrets Manager) rather than a `.env` file.

---

## 🤝 Contributing

Contributions are welcome. Please follow the standard GitHub flow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: describe your change'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request with a clear description

Please ensure all existing tests pass before submitting a PR:

```bash
npm test
```

---

## 🔮 Future Improvements

| Feature | Description |
|---|---|
| `delete-team` | Remove a team folder and all associated jobs |
| `delete-pipeline` | Delete a specific pipeline job |
| `view-logs` | Stream real-time build console output to terminal |
| `build-status` | Poll and display current build status |
| **GitHub Webhook** | Auto-trigger builds on push events |
| **Kubernetes support** | Deploy Jenkins on a Kubernetes cluster |
| **Role-based access** | Assign permissions per team folder |

---


## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**CSE3253 DevOps [PE6] · Semester VI (2025–2026)**

Built to eliminate repetitive Jenkins work — one CLI command at a time.

⭐ Star this repo if it helped you!

</div>