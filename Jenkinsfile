pipeline { 
    environment {
            EMAIL = 'vivek.joseph.cs@bcbsa.com'
    }
    agent {
        node {
            label 'Linux-commercial'
        }
    }  
    stages {       
        stage('Remove modules') { 
            steps { 
                sh "rm -rf package-lock.json node_modules" 
            }
        }
        
		stage('Cache clean') { 
            steps { 
                sh "npm cache clean --force" 
            }
        }
		
		stage('npm install') { 
            steps {     
                sh "npm install --save --legacy-peer-deps" 
            }
        }
		
		stage('Build') { 
            steps {      
                sh "ng build" 
            }
        }
		
		stage('htaccess') { 
            steps { 
                sh "cp .htaccess ./dist/" 
            }
        }
	
	stage('SonarAnalysis') { 
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
            steps {
                withSonarQubeEnv('sonarqubeEnterprise') {
                    sh "${scannerHome}/bin/sonar-scanner -X -Dsonar.verbose=true -Dproject.settings=./sonar.properties"
                }
            }
        }

        stage('Whitesource Scan') { 
            steps {
                sh '''						
                    java -jar /opt/agent/whitesource/whitesource-latest.jar -c ./whitesource-fs-agent.config -d ${WORKSPACE}
                        
                '''					
            }
        }
		
		stage('zip') { 
            steps {
                sh '''
                    cd dist/rule-validator
                    zip -r rule-validator-angular.zip *
                '''					
            }
        }

        stage('Artifactory Publish') { 
            steps{
                rtUpload (
                    serverId: 'Artifactory',
                    spec: '''{
                        "files": [
                            {
                                "pattern": "dist/rule-validator/rule-validator-angular.zip",
                                "target": "EDSSE_NDW_L2_validation/${BRANCH_NAME}/${BUILD_ID}/"
                            }
                        ]}'''
                )
            }
        }	
    }
	
	post {
			success {
				script { 
					echo('Pipeline build successful')
					mail to: "${EMAIL}", subject: 'Pipeline successful', body: "Build Success"
				}
				
			}
			failure {
				script { 
					echo('Pipeline build failed')
					mail to: "${EMAIL}", subject: 'Pipeline failed', body: "Build Failed"  
				}           
			}
	}
}
