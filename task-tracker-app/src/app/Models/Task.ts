export class Task { 
    id: number = 0;
    title: string = "";
    description: string = "";
    createdOn: string = this.getDate();
    status: number = 0;
    priority: number = 0;
    profileId: number = 0;

    private getDate():string{
        let dt = new Date();
        let date = dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
        return  date;
    }
}
