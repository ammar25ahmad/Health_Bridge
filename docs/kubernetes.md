# Kubernetes Deployment

## Manifests
All manifests are in `kubernetes/` directory.

### Apply all manifests:
```bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/secrets.example.yaml
kubectl apply -f kubernetes/mongodb-deployment.yaml
kubectl apply -f kubernetes/auth-deployment.yaml
kubectl apply -f kubernetes/resource-deployment.yaml
kubectl apply -f kubernetes/ai-deployment.yaml
kubectl apply -f kubernetes/python-deployment.yaml
kubectl apply -f kubernetes/gateway-deployment.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
```

### Dry run (validate without applying):
```bash
kubectl apply --dry-run=client -f kubernetes/
```

### Check status:
```bash
kubectl get pods -n healthbridge
kubectl get services -n healthbridge
```

### Delete:
```bash
kubectl delete -f kubernetes/
```

## Notes
- Secrets in `secrets.example.yaml` are for demonstration only
- Replace with real secrets for production
- MongoDB uses a PersistentVolumeClaim for data persistence
- Gateway and Frontend use LoadBalancer service type
