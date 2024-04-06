import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {createConnection} from "mysql2/promise";
import {IPaziente} from "./models/IPaziente";

const getConnection = async () => {
  return await createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "3306"),
  });
};

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const debugEvent = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      throw new Error("No ID provided");
    }

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({
        id: id,
        event: event,
      }),
    };

    return response;
  } catch (error: unknown) {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: error,
      }),
    };

    return response;
  }
};

/**
 * Retrieves all patients from the database.
 * @returns A Promise that resolves to an APIGatewayProxyResult object containing the retrieved patients.
 */
export const getAllPatients = async (): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await getConnection();

    const [rows] = await dbConnection.query("SELECT * FROM Paziente");
    await dbConnection.end();

    console.table(rows);

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(rows as IPaziente[]),
    };

    return response;
  } catch (error: unknown) {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: error,
      }),
    };

    return response;
  }
};

/**
 * Retrieves a patient from the database based on the provided ID.
 * @param id - The ID of the patient to retrieve.
 * @returns A Promise that resolves to an APIGatewayProxyResult object containing the retrieved patient information.
 */
export const getPatientById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await getConnection();

    const id = event.pathParameters?.id;

    if (!id) {
      throw new Error("No ID provided");
    }

    const [rows] = await dbConnection.query("SELECT * FROM Paziente WHERE id = ?", [id]);
    await dbConnection.end();

    console.table(rows);

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(rows),
    };

    return response;
  } catch (error: unknown) {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
          message: error,
      }),
    };

    return response;
  }
};

/**
 * Creates a new patient record in the database.
 * 
 * @param paziente - The patient object to be created.
 * @returns A Promise that resolves to an APIGatewayProxyResult object representing the HTTP response.
 */
export const createPatient = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await getConnection();

    const paziente: IPaziente = JSON.parse(event.body || "{}");

    const [rows] = await dbConnection.query("INSERT INTO Paziente SET ?", paziente);
    await dbConnection.end();

    console.table(rows);

    const response: APIGatewayProxyResult = {
      statusCode: 201,
      headers: headers,
      body: JSON.stringify(rows),
    };

    return response;
  } catch (error: unknown) {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: error,
      }),
    };

    return response;
  }
};

/**
 * Updates a patient record in the database.
 * 
 * @param id - The ID of the patient to update.
 * @param paziente - The updated patient object.
 * @returns A Promise that resolves to an APIGatewayProxyResult object.
 */
export const updatePatient = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await getConnection();

    const id = event.pathParameters?.id;
    const paziente: IPaziente = JSON.parse(event.body || Object.prototype.toString()) as IPaziente;

    if (!id || paziente === Object.prototype) {
      throw new Error("No ID provided");
    }

    const [rows] = await dbConnection.query("UPDATE Paziente SET ? WHERE id = ?", [paziente, id]);
    await dbConnection.end();

    console.table(rows);

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(rows),
    };

    return response;
  } catch (error: unknown) {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: error,
      }),
    };

    return response;
  }
};

/**
 * Deletes a patient from the database.
 *
 * @param id - The ID of the patient to delete.
 * @returns A promise that resolves to an APIGatewayProxyResult object.
 */
export const deletePatient = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dbConnection = await getConnection();

    const id = event.pathParameters?.id;

    if (!id) {
      throw new Error("No ID provided");
    }

    const [rows] = await dbConnection.query("DELETE FROM Paziente WHERE id = ?", [id]);
    await dbConnection.end();

    console.table(rows);

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(rows),
    };

    return response;
  } catch (error: unknown) {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: error,
      }),
    };

    return response;
  }
};