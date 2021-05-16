# Creating Service

## Adding ingress service

`minikube addons enable ingress`

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-service
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
    - host: posts.com
      http:
        paths:
          - path: /posts
            backend:
              serviceName: posts-service
              servicePort: 4000
```

`kubectl apply -f ingress/service.yaml`

## ClusterIp service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: posts-service
spec:
  selector:
    app: posts
  ports:
    - name: posts
      protocol: TCP
      port: 4000
      targetPort: 4000
```

- ClusterIp is the default service

## NodePort service

`posts-nodeport-service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: posts-nodeport-service
spec:
  type: NodePort
  selector:
    app: posts
  ports:
    - name: posts
      protocol: TCP
      port: 4000
      targetPort: 4000
```

`kubectl apply -f posts-nodeport-service.yaml`

### Common commands

`kubectl get services`
`kubectl describe service posts-service`
`kubectl delete service posts-service`

# Updating Deployment

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
