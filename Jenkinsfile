pipeline {
    agent any

    stages {
        stage('Check Docker Version') {
            steps {
                script {
                    // This will run the command 'docker --version' inside the Jenkins container
                    sh 'docker --version'
                }
            }
        }
    }
}
