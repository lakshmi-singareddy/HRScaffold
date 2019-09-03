pipeline {
    agent any

    stages {
        stage('Build') {
        steps {
                sh 'mvn clean install -DskipTests'
            }

        }
     
    
     stage('Artifactory configuration') {
            steps {
            script {
                 
                 def server = Artifactory.newServer url: 'http://172.17.0.2:8081/artifactory', username: 'admin', password: 'Hysc@l3@789'
                 def uploadSpec = """{
                    "files": [{
                       "pattern": "${WORKSPACE}/target/*.war",
                       "target": "HRScaffold/${BUILD_NUMBER}/"
                    }]
                 }"""
            
                 server.upload(uploadSpec) 
               }
                         
                   } 

        }
     stage('Dev-Deploy') {
            steps {
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/*-props.yaml'
            echo 'Deploying '
            sh 'hyscalectl login --config /var/lib/jenkins/credentials' 
            sh 'hyscalectl deploy -s hrms-frontend -e dev -p ${WORKSPACE}/dev-props.yaml -a HRMS'
            sh "bash /var/lib/jenkins/service-status.sh HRMS 0"
        }
    }
     stage('Stage-Deploy') {
            steps {
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/*-props.yaml'
            echo 'Deploying '
            sh 'hyscalectl login --config /var/lib/jenkins/credentials'
            sh 'hyscalectl deploy -s hrms-frontend -e stage -p ${WORKSPACE}/stage-props.yaml -a HRMS'
            sh "bash /var/lib/jenkins/service-status.sh HRMS 1"
        }
    }
}

}

