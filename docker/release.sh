



#!/bin/bash



# 使脚本在遇到任何错误时自动退出
set -e

# 定义一个错误处理函数
error_handler() {
    local exit_code=$?
    local line_no=$1
    echo "Error on line $line_no. Exit code: $exit_code"
    exit $exit_code
}

# 使用trap命令捕获错误并调用错误处理函数
trap 'error_handler $LINENO' ERR


VERSION=$(date +%Y%m%d%H%M)
BACK_IMAGE_NAME=liuhuapiaoyuan/coze-webhook
# 编译后端
echo "Building backend..."
export DOCKER_BUILDKIT=1

docker build -f ./docker/Dockerfile  -t $BACK_IMAGE_NAME:latest -t $BACK_IMAGE_NAME:$VERSION .
 
echo "Build complete."


echo "Pushing images to Docker Hub..."

docker push $BACK_IMAGE_NAME:latest
docker push $BACK_IMAGE_NAME:$VERSION

 
echo "Push complete."

