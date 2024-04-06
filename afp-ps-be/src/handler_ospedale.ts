/**
 *  $ GET
 *      - getAllPazienti
 *      - getPazientiById
 *
 *  $ POST
 *      - createPaziente
 *
 *  $ PUT
 *      - updatePaziente
 *
 *  $ DELETE
 *      - deletePaziente
 */

import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import { createConnection } from "mysql2/promise";
import { IPaziente } from "./models/IPaziente";


const getDbConnection = async () => {
    return await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || "3306"),
    });
};


export const getAllPazienti = async (): Promise<APIGatewayProxyResult> => {
    try {
      const dbConnection = await getDbConnection();

      const [rows] = await dbConnection.query("SELECT * FROM Pazienti");
      await dbConnection.end();

      const response: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(rows),
      };
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Error creating database connection",
          error: error,
        }),
          };
    }
};


export const getPazientiById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        
        if(!event.pathParameters?.id) {
            throw new Error("Missing id parameter in the URL.");
        }
        
        const dbConnection = await getDbConnection();

      const [rows] = await dbConnection.query(
        "SELECT * FROM Pazienti WHERE id = ?",
        [event.pathParameters?.id]
      );

      await dbConnection.end();

      const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(rows),
      };
      
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Error creating database connection",
          error: error,
        }),
      };
    }
};


export const createPaziente = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {

        if (!event.body) {
            throw new Error("Missing request body");
        }

        const paziente: Omit<IPaziente, "ID"> = JSON.parse(event.body);

        const dbConnection = await getDbConnection();

        const [rows] = await dbConnection.query(
            "INSERT INTO Pazienti SET ?", 
            [paziente]
        );
        await dbConnection.end();

        console.table(rows);

      const response: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(rows),
      };
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Error creating database connection",
          error: error,
        }),
        };
    }
};

export const updatePaziente = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
        try {

        if (!event.body) {
            throw new Error("Missing request body");
        }
        if(!event.pathParameters?.id) {
            throw new Error("Missing id parameter in the URL.");
        }

        const paziente: Partial<IPaziente> = JSON.parse(event.body);
        const id = event.pathParameters?.id;

        const dbConnection = await getDbConnection();

        const [rows] = await dbConnection.query(
            "UPDATE Pazienti SET ? WHERE id = ?",
            [paziente, id]
        );
        await dbConnection.end();

        console.table(rows);

      const response: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(rows),
      };
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Error creating database connection",
          error: error,
        }),
        };
    }
};

export const deletePaziente = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        if(!event.pathParameters?.id) {
            throw new Error("Missing id parameter in the URL.");
        }

        const dbConnection = await getDbConnection();

        // const [rows] = await dbConnection.query(
        //     "DELETE FROM Pazienti WHERE id = ?",
        //     [event.pathParameters?.id]
        // );

        const [rows] = await dbConnection.query(
            "UPDATE Pazienti SET stato = 'DIMISSIONE' WHERE id = ?",
            [event.pathParameters?.id]
        );
        await dbConnection.end();

        console.table(rows);

      const response: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(rows),
      };
      return response;
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Error creating database connection",
          error: error,
        }),
        };
    }
};
