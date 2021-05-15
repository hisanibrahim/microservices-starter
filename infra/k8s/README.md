# Updating Deployemt

- After updating application code, update Deployment config if necessary

`kubectl apply -f posts-deployment.yaml`

`docker build . -t hisanibrahim/posts:0.0.1`

`docker login`

`docker push hisanibrahim/posts`

`kubectl rollout restart deployment posts-deployment`

# Creating Deployemt

`posts-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: posts-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: posts
  template:
    metadata:
      labels:
        app: posts
    spec:
      containers:
        - name: posts
          image: hisanibrahim/posts:0.0.1
```

`kubectl apply -f posts-deployment.yaml`

### Common commands

`kubectl get deployments`
`kubectl describe deployment posts-deployment`
`kubectl delete deployment posts-deployment`

# Creating Pod

## Connect your Docker CLI to the docker daemon inside the VM

`eval $(minikube docker-env)`

_*Note*_

- _This command will need to be repeated anytime you close and restart the terminal session_
- _Afterward, you can build your image_
- _This is all possible due to those environment variables by docker-env_
- _These variables will help your docker CLI (where you write docker commands) temporarily to connect with docker daemon in the VM created by minikube_

### Build image

`docker build . -t hisanibrahim/posts:0.0.1`

## Create a pod

`posts.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: posts
spec:
  containers:
    - name: posts
      image: hisanibrahim/posts:0.0.1
      imagePullPolicy: Never
```

`kubectl apply -f posts.yaml`

### Common commands

`kubectl get pods`
`kubectl delete -f ./`
`kubectl delete pod posts`
`kubectl exec -it posts -- sh`
`kubectl describe pod posts`
`kubectl logs posts`
