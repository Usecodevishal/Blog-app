import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  

  constructor() {

    console.log(typeof conf.appwriteUrl);
  console.log(typeof conf.appwriteProjectId);
  console.log(typeof conf.appwriteCollectionId);
  console.log(typeof conf.appwriteBucketId);
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("657483f6ca6debaca0d9");
    this.account = new Account(this.client);
  }
   
  async createAccount({email, password, name}){
    try{
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        console.log("useraccount: ",userAccount);
        if(userAccount){
            // call another method accordingly
            return this.login({email, password});
        }else {
            return userAccount;
        }
    }catch (error){
        throw error;
    }
  }

  async login ({email, password}){
    try {
        return await this.account.createEmailSession(email, password);
    } catch (error) {
        throw error;
    }
  }

  async getCurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite Service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout(){
    try {
         await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite service :: logout :: error", error);
    }
  }



}

const authService = new AuthService();

export default authService;
