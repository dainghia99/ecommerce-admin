This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Bắt đầu

Đầu tiên chắc chắn rằng máy của bạn đã cài `nodejs`
Bạn có thể gõ

```bash
npm -v
```

để kiểm tra version đã cài đặt để thực hiện các bước tiếp theo!
Nếu bạn chưa cài đặt vui lòng lên trang chủ của [`Nodejs`](https://nodejs.org/en) để cài đặt

## Tiến tải các thư viện phụ thuộc

Sau khi bạn đã cài đặt `Nodejs` bạn tiến hành cài đặt các thư viện phụ thuộc bằng cách gõ câu lệnh:

```bash
npm install
```
- Lưu ý bạn muốn chạy file `docker-compose.yml` thì thực hiện câu lệnh sau:
```bash
docker-compose -p mysql up -d
``` 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
