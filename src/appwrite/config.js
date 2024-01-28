import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Making our own class to give various service like create-post, update-post, delete-post

export class Service {
  client = new Client();
  databases;
  bucket;
 // Maki
  constructor() {
    

    this.client
      .setEndpoint( "https://cloud.appwrite.io/v1")
      .setProject("657483f6ca6debaca0d9");
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        "6584538e1fa4a7fbb3b8",
        "65845416acc1a82fcc78",
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        "6584538e1fa4a7fbb3b8",
        "65845416acc1a82fcc78",
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        "6584538e1fa4a7fbb3b8",
        "65845416acc1a82fcc78",
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        "6584538e1fa4a7fbb3b8",
        "65845416acc1a82fcc78",
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        "6584538e1fa4a7fbb3b8",
        "65845416acc1a82fcc78",
        queries,
      )
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        "65845c2783033c34b442",
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile("65845c2783033c34b442", fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview("65845c2783033c34b442", fileId);
  }
}

let service = new Service();

export default service;
