<div align="center">

<h1>Deploy puppeteer headless api in vercel</h1>
<br/>

![image](https://github.com/hehehai/h-blog/assets/12692552/712824de-8b97-44f3-a402-bd213def7c63)

</div>

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 环境变量配置

默认开发环境（dev）环境。在生产环境中，需要配置以下环境变量：

- `WS_EDPOINT`：用于连接远程浏览器的WebSocket端点

在Vercel部署时，请在项目设置中添加此环境变量以确保正常运行。

## Features

- Support webpage screenshots
- Support cloudflare [nopecha](https://nopecha.com/demo)

![image](https://github.com/hehehai/h-blog/assets/12692552/bd4cc26c-2bd4-476f-a7ab-d2b5e3d0ae74)
![image](https://github.com/hehehai/h-blog/assets/12692552/02a65b4a-2f9b-421a-ba26-0f790b0951be)

## Refs

- [在 Vercel 部署无头浏览器实现网页截图](https://www.hehehai.cn/posts/vercel-deploy-headless)
