# COZE 管理端

- 创建 coze_webhook,包含 url,authorization
- 床架 api_endpoint管理，包含字段 coze_webhook_id,type(openaiLike/request),name,description,创建时间
- 创建 api_key 管理，随机生成apikey,并且可以勾选允许调用的api_endpoint
- 创建 api_endpoint_logs，记录 hook的请求日志（包含 接口调用请求参数，时间，apid_endpoint_id,coze_webhook_id，返回结果，接口调用耗费时间，使用key）
