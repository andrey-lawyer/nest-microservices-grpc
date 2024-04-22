nest new nest-monorepo-grpc
cd nest-monorepo-grpc
nest g app auth

npm run start:dev (default - client)
npm run start:dev auth

nest g resource users

npm i -S @nestjs/microservices

npm i --save @grpc/grpc-js @grpc/proto-loader

npm i -S ts-proto

protoc --plugin=./node_modules/.bin/protoc-gen_ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/auth.proto

nest g lib common

"auth": {
"type": "application",
"root": "apps/auth",
"entryFile": "main",
"sourceRoot": "apps/auth/src",
"compilerOptions": {
"tsConfigPath": "apps/auth/tsconfig.app.json"
}
},

"$schema": "https://json.schemastore.org/nest-cli",
"collection": "@nestjs/schematics",
"sourceRoot": "apps/client/src",
"compilerOptions": {
"deleteOutDir": true,
"webpack": true,
"tsConfigPath": "apps/client/tsconfig.app.json"
},
