export  const fieldMetadata : inputProps= [
    {id:1,name:'restName',label:'Resturant Name',type:'text',validators:{required:true,max:20}},
    {id:2,name:'restAddress',label:'Resturant Address',type:'textArea',validators:{required:true,max:200}},
    {id:3,name:'restLocation',label:'Resturant Location',type:'map',validators:{}},
    {id:4,name:'lat',label:'Latitude',type:'number',validators:{required:true}},
    {id:5,name:'lng',label:'Longitude',type:'number',validators:{required:true}},
    {id:6,name:'ownerName',label:'Owner Name',type:'text',validators:{required:true,max:20}},
    {id:7,name:'mobileNo',label:'Mobile Number',type:'number',validators:{required:true,pattern:/^[7-9]{1}[0-9]{9}$/}},
    {id:8,name:'',label:'Submit',type:'button',validators:{}},
]

type inputProps = {
    id:number
    name:string,
    label: string;
    type: string;
    validators: {required?:boolean;message?:string;max?:number;pattern?:RegExp};
    hasButton?: boolean;
    button?: { label: string; action: string };
  }[];
RegExp