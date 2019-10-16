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
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/hyscale/props/*-props.yaml'
            sh 'hyscalectl login --config /var/lib/jenkins/credentials' 
            sh 'hyscalectl deploy -f ${WORKSPACE}/hyscale/service-specs/hrms-frontend.hspec.yaml -e Test -p ${WORKSPACE}/hyscale/props/test-props.yaml -a HRScaffold'
            sh "bash /var/lib/jenkins/service-status.sh HRScaffold 0"
        }
    }
    
    stage('Dev-Sanity-Test') {
            steps {
            echo 'Running Tests... '
            sh "bash /var/lib/jenkins/sanity-test.sh HRScaffold Test"
        }
    }

     stage('Stage-Deploy') {
            steps {
            input message: 'Deploy to stage? (Click "Proceed" to continue)'
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/hyscale/props/*-props.yaml'
            sh 'hyscalectl login --config /var/lib/jenkins/credentials'
            sh 'hyscalectl deploy -f ${WORKSPACE}/hyscale/service-specs/hrms-frontend.hspec.yaml -e Stage -p ${WORKSPACE}/hyscale/props/stage-props.yaml -a HRScaffold'
            sh "bash /var/lib/jenkins/service-status.sh HRScaffold 1"
        }
    }
    
    stage('Stage-Sanity-Test') {
            steps {
            echo 'Running Tests... '
            sh "bash /var/lib/jenkins/sanity-test.sh HRScaffold Stage"
        }
    }
}

}

