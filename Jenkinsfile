pipeline {
    agent any

    stages {
        stage('Build') {
        steps {
                sh 'mvn clean install -DskipTests'
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
            sh 'hyscalectl login --config /var/lib/jenkins/credentials' 
            sh 'hyscalectl deploy -f ${WORKSPACE}/hyscale/service-specs/hrms-frontend.hspec.yaml -e dev -p dev -a HRMS -d BUILD_NUM=${BUILD_NUMBER}'
            sh "bash ${WORKSPACE}/scripts/service-status.sh HRMS dev"
        }
    }
    
    stage('Dev-Sanity-Test') {
            steps {
            sh "bash ${WORKSPACE}/scripts/sanity-test.sh HRMS dev"
        }
    }

     stage('Stage-Deploy') {
            steps {
            timeout(time: 1, unit: 'HOURS') {
                            input message: 'Deploy to stage? (Click "Proceed" to continue)'
                        }
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/hyscale/props/*-props.yaml'
            sh 'hyscalectl login --config /var/lib/jenkins/credentials'
            sh 'hyscalectl deploy -f ${WORKSPACE}/hyscale/service-specs/hrms-frontend.hspec.yaml -e stage -p stage -a HRMS -d BUILD_NUM=${BUILD_NUMBER}'
            sh "bash  ${WORKSPACE}/scripts/service-status.sh HRMS stage"
        }
    }
    
    stage('Stage-Sanity-Test') {
            steps {
            sh "bash ${WORKSPACE}/scripts/sanity-test.sh HRMS stage"
        }
    }
}

}

