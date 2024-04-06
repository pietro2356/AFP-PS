import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {createConnection} from "mysql2/promise";
import {IPaziente} from "./models/IPaziente";

export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: "Hello World fro AWS Lambda!",
        ingress: JSON.parse(event.body?.trim() || "{}"),
      }),
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
        message: "Internal Server Error",
        error: error,
      }),
    };
  }
};

/**
 * Retrieves all patients from the database.
 *
 * @returns {Promise<APIGatewayProxyResult>} The APIGatewayProxyResult containing the retrieved patients.
 */
export const getAllPatients = async (): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "3306"),
    });

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


/**
 * Creates a new patient record in the database.
 * 
 * @param event - The API Gateway event object.
 * @returns A promise that resolves to an API Gateway proxy result.
 */
export const createPatient = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "3306"),
    });

    
    
    
    
    const body: Partial<IPaziente> = JSON.parse(event.body || "{}");

    const dataMySQL = `${body.dataNascita?.getFullYear()}-${body.dataNascita?.getMonth()}-${body.dataNascita?.getDay()}`; // data in formato YYYY-MM-DD

    const [rows] = await dbConnection.query(
      "INSERT INTO Pazienti (codice, nome, cognome, dataNascita, medico, codiceColore, stato, modalitaArrivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.codicePaziente,
        body.nome,
        body.cognome,
        dataMySQL,
        body.medico,
        body.codiceColore,
        body.stato,
        body.modalitaArrivo,
      ]
    );

    await dbConnection.end();

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(rows),
    };
    return response;
    
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: "Error creating database connection",
        error: error,
      }),
    };
  }
}


/**
 * Retrieves a patient by their ID from the database.
 *
 * @param event - The API Gateway event object.
 * @returns A promise that resolves to an API Gateway proxy result.
 */
export const getPatientById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "3306"),
    });

    const body: Partial<IPaziente> = JSON.parse(event.body || "{}");
    const [rows] = await dbConnection.query(
      "SELECT * FROM Pazienti WHERE id = ?",
      [body.id]
    );

    await dbConnection.end();

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
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
}

/**
 * Retrieves a patient from the database based on their name, surname, and birth date.
 * @param event - The APIGatewayProxyEvent object containing the request details.
 * @returns A Promise that resolves to an APIGatewayProxyResult object representing the response.
 */
export const getPatientByNameSurnameBirthDate = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "3306"),
    });

    const body: Partial<IPaziente> = JSON.parse(event.body || "{}");
    const [rows] = await dbConnection.query(
      "SELECT * FROM Pazienti WHERE nome = ? AND cognome = ? AND dataNascita = ?",
      [body.nome, body.cognome, new Date(body.dataNascita ? body.dataNascita : "")]
    );

    await dbConnection.end();

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
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
}