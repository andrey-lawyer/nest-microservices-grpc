nest new nest-monorepo-grpc
cd nest-monorepo-grpc
nest g app auth2

npm run start:dev (default - client)
npm run start:dev auth2

nest g resource users

npm i -S @nestjs/microservices

npm i --save @grpc/grpc-js @grpc/proto-loader

npm i -S ts-proto

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/auth2.proto

protoc --plugin=/c/Users/UNICEF/AppData/Roaming/npm/protoc-gen-ts_proto.cmd --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/
auth2.proto

protoc --plugin=protoc-gen-ts_proto.cmd --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/auth2.proto

nest g lib common

"auth2": {
"type": "application",
"root": "apps/auth2",
"entryFile": "main",
"sourceRoot": "apps/auth2/src",
"compilerOptions": {
"tsConfigPath": "apps/auth2/tsconfig.app.json"
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

nest g resource users

npm run start:dev auth2
npm run start:dev client
npm run start:dev db
