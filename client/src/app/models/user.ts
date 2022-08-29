export class User{
    constructor(
        public _id:string,
        public nombre:string,
        public email:string,
        public contrasena:string,
        public numero:string,
        public ubicacion:string,
        public descripcion:string,
        public image:string,
        public portada:string
    ){}
}