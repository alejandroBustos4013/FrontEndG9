import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { API_URL,getToken } from "../../util/Util";

export const Register = () => {
    const [formData, setFormData] = useState({
      email: "",
      username: "",
      password: "",
      full_name: "",
      phone: "",
      number_identification: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((values) => ({ ...values, [name]: value }));
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await sendClientApi();
      console.log(`response`, response);
    };
    
      const sendClientApi = async () => {
        const requestData = {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        };
        let response = await fetch(API_URL+"user/", requestData);
        response = await response.json();
        return response;
      };



    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
             <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombres"
                    name="full_name"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Número de identificación</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Número deIdentificacion"
                    name="number_identification"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Teléfono de contacto"
                    name="phone"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                />
                <Form.Text className="text-muted">
                    No comparitr su correo personal con otros usuarios
                </Form.Text>
            </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBirhtDate">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Usuario"
                    name="username"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Registra tu contraseña"
                    name="password"
                    onChange={handleChange}
                />
            </Form.Group>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </div>
  );
}