pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-creds')
        DOCKER_HUB_USER = 'houssamzitan'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github-creds', url: 'https://github.com/HoussamZn/FinTech.git', branch: 'main'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    def services = [
                        [name: "gateaway", path: "backend/gateaway"],
                        [name: "user_service", path: "backend/user_service"],
                        [name: "account_service", path: "backend/account_service"],
                        [name: "bank_service", path: "backend/bank_service"],
                        [name: "eth-price", path: "backend/eth-price"],
                        [name: "front", path: "Front"]
                    ]

                    for (svc in services) {
                        bat "docker build -t ${DOCKER_HUB_USER}/fintech/${svc.name}:latest ${svc.path}"
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                bat "echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin"
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    def services = ["gateaway", "user_service", "account_service", "bank_service", "eth-price", "front"]
                    for (svc in services) {
                        bat "docker push ${DOCKER_HUB_USER}/fintech/${svc}:latest"
                    }
                }
            }
        }
    }
}
