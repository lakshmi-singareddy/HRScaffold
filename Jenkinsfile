pipeline {
    agent any

    stages {
        stage('Build') {
     agent {   
            docker {
            image 'maven:3.3.9-jdk-8-onbuild-alpine'
            args '-v /root/.m2:/root/.m2'
            }

          } 
        steps {
                sh 'mvn clean install -DskipTests'
            }

        }
     
    
     stage('Artifactory configuration') {
            steps {
            script {
                 echo "first" 
                 def server = Artifactory.newServer url: 'http://172.17.0.2:8081/artifactory', username: 'admin', password: 'Hysc@l3@789'
                 def uploadSpec = """{
                    "files": [{
                       "pattern": "${WORKSPACE}/target/*.war",
                       "target": "HRMS/${BUILD_NUMBER}/"
                    }]
                 }"""
                 echo "second"
                 server.upload(uploadSpec) 
               }
                         
                   } 

        }
     stage('Deploy') {
            steps {
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/*-props.yaml'
            echo 'Deploying '
            sh 'hyscalectl login demo.hyscale.io -udemo@hyscale.com -pHysc@l3@987'
            sh 'hyscalectl deploy -s hrms-frontend -e qa -p ${WORKSPACE}/dev-props.yaml -a hrms-cli'
            sleep(120)
        }
    }
}

}

