## Create a pod

`kubectl apply -f posts.yaml`

### Help commands

`kubectl get pods`
`kubectl delete -f ./`
`kubectl delete pod posts`
`kubectl exec -it posts -- sh`
`kubectl describe pod posts`
`kubectl logs posts`

### Tell Kubernetes to use the Docker daemon running inside of the single node cluster

`eval $(minikube docker-env)`
`docker build . -t hisanibrahim/posts:0.0.1`