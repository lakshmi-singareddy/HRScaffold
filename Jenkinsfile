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
     
     stage('Test-Deploy') {
            steps {
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/hyscale/props/*-props.yaml'
            sh 'hyscalectl login --config /var/lib/jenkins/credentials' 
            sh 'hyscalectl deploy -f ${WORKSPACE}/hyscale/service-specs/hrms-frontend.hspec.yaml -e Test -p ${WORKSPACE}/hyscale/props/test-props.yaml -a HRScaffold'
            sh "bash ${WORKSPACE}/scripts/service-status.sh HRScaffold Test"
        }
    }
    
    stage('Test-Sanity-Test') {
            steps {
            sh "bash ${WORKSPACE}/scripts/sanity-test.sh HRScaffold Test"
        }
    }

     stage('Stage-Deploy') {
            steps {
            timeout(time: 1, unit: 'HOURS') {
                            input message: 'Do you want to approve the stage deploy?', ok: 'Yes'
                        }
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/hyscale/props/*-props.yaml'
            sh 'hyscalectl login --config /var/lib/jenkins/credentials'
            sh 'hyscalectl deploy -f ${WORKSPACE}/hyscale/service-specs/hrms-frontend.hspec.yaml -e Stage -p ${WORKSPACE}/hyscale/props/stage-props.yaml -a HRScaffold'
            sh "bash ${WORKSPACE}/scripts/service-status.sh HRScaffold Stage"
        }
    }
    
    stage('Stage-Sanity-Test') {
            steps {
            sh "bash ${WORKSPACE}/scripts/sanity-test.sh HRScaffold Stage"
        }
    }
}

}

