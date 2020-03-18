# K8d

基于 Gitlab / Jenkins / Docker / K8s 的自动化部署平台 


### Get Start

Install

``` sh
$ make install
```

Dev

``` sh
$ npm run dev
```

build

``` sh
$ make build
```

### API
- `GET /manager/all_status` 获取指定 namespace 下的所以 pod/service/deployment 状态信息
- `POST /manager/deploy` 指定镜像部署服务
> Request Body
``` json
{
  "image": "docker.xx.com/xxx:v1", // 镜像地址
  "imagePullPolicy": "IfNotPresent", // 镜像录取方式 Always、IfNotPresent
  "port": 9999, // 服务对外端口
  "minResource": {"cpu": "1G", "memory": "100M"}, // 限制机器资源
  "healthCheck": { // 健康检查
    "liveness": {"isOpen": false},  // 存活参数
    "readiness": {"isOpen": false} // 就绪参数
  },
  "appCode": "xxx" // deployment name
}
```

### Author
K8d © [Ricky 泽阳](https://github.com/rickyes), Released under the MIT License.
