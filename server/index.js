const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Uade2024"
});

app.post("/create",(req,res)=>{
    const nombreProducto = req.body.nombreProducto;
    const nombreComercial = req.body.nombreComercial;
    const precioVenta = req.body.precioVenta;
    const proveedorProducto = req.body.proveedorProducto;
    const precioCompra = req.body.precioCompra;

    db.query('INSERT INTO producto(nombreProducto,nombreComercial,precioVenta,proveedorProducto,precioCompra) VALUES(?,?,?,?,?)',[nombreProducto,nombreComercial,precioVenta,proveedorProducto,precioCompra],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/productos",(req,res)=>{
    db.query('SELECT * FROM producto',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombreProducto = req.body.nombreProducto;
    const nombreComercial = req.body.nombreComercial;
    const precioVenta = req.body.precioVenta;
    const proveedorProducto = req.body.proveedorProducto;
    const precioCompra = req.body.precioCompra;

    db.query('UPDATE producto SET nombreProducto=?,nombreComercial=?,precioVenta=?,proveedorProducto=?,precioCompra=? WHERE id=?',[nombreProducto,nombreComercial,precioVenta,proveedorProducto,precioCompra,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM producto WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})