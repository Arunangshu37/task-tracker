export class Profile { 
    id: number = 0;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    password: string = "";
    token: string = "";
    createdOn: Date = new Date();
    imagePath: string = "assets/default-profile-image.jpg";
    image!: any;
}