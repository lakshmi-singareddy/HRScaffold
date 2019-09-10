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
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/hyscale/props/*-props.yaml'
            sh 'sed -i "s|@@WORKSPACE@@|${WORKSPACE}|g" ${WORKSPACE}/hyscale/service-specs/*.yaml'
            sh 'sed -i "s|@@CONFIG_DIR@@|hyscale/service-specs/config/|g" ${WORKSPACE}/hyscale/service-specs/*.yaml'
            echo 'Deploying '
            sh 'hyscalectl login --config /var/lib/jenkins/credentials' 
            sh 'hyscalectl deploy -f ${WORKSPACE}/hyscale/service-specs/hrms-frontend.hspec.yaml -e dev -p ${WORKSPACE}/hyscale/props/dev-props.yaml -a HRMS'
            sh "bash /var/lib/jenkins/service-status.sh HRMS 0"
        }
    }
    
    stage('Dev-Sanity-Test') {
            steps {
            echo 'Running Tests... '
            sh "bash /var/lib/jenkins/sanity-test.sh HRMS dev"
        }
    }

     stage('Stage-Deploy') {
            steps {
            sh 'sed -i "s/@@BUILD_NUMBER@@/${BUILD_NUMBER}/g" ${WORKSPACE}/hyscale/props/*-props.yaml'
            echo 'Deploying '
            sh 'hyscalectl login --config /var/lib/jenkins/credentials'
            sh 'hyscalectl deploy -f ${WORKSPACE}/hyscale/service-specs/hrms-frontend.hspec.yaml -e stage -p ${WORKSPACE}/hyscale/props/stage-props.yaml -a HRMS'
            sh "bash /var/lib/jenkins/service-status.sh HRMS 1"
        }
    }
    
    stage('Stage-Sanity-Test') {
            steps {
            echo 'Running Tests... '
            sh "bash /var/lib/jenkins/sanity-test.sh HRMS stage"
        }
    }
}

}

