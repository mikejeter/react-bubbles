import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from 'styled-components';

const ColorListStyles = styled.div`


.formDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    margin-top: -2px;
    margin-bottom: 3rem;
  }

}
`;


const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const classes = useStyles();
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [createColor, setCreateColor] = useState({
    code: { hex: "" },
    color: "",
    id: Date.now()
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        axiosWithAuth()
          .get("/api/colors")
          .then(response => updateColors(response.data))
          .catch(error => console.log(error));
        setEditing(false);
      })
      .catch(error => console.log(error));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(() => {
        axiosWithAuth()
          .get("/api/colors")
          .then(response => updateColors(response.data))
          .catch(error => console.log(error));
        setEditing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleColorSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/colors", createColor)
      .then(() => {
        axiosWithAuth()
          .get("/api/colors")
          .then(response => {
            updateColors(response.data);
          });
      });
  };

  const handleColorChange = event => {
    event.preventDefault();
    setCreateColor({
      ...createColor,
      [event.target.name]: event.target.value
    });
  };

  return (
    <ColorListStyles>
    <div className="colors-wrap">
    <div>
      <div className="formDiv">
        <h3>Add Color</h3>
        <form onSubmit={handleColorSubmit} className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
            value={createColor.color}
            onChange={handleColorChange}
            type="text"
            name="color"
              id="outlined-basic"
              label="Color Name"
              variant="outlined"
            />
          </div>
          <div>
          <TextField
          value={createColor.code.hex}
          onChange={event => setCreateColor({...colorToEdit, code: {hex: event.target.value}})}
          type="text"
          name="code"
            id="outlined-basic"
            label="Hex Code"
            variant="outlined"
          />
        </div>
        <button type="submit">Add Color</button>
        </form>
      </div>
    </div>
    <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

    </div>
    </ColorListStyles>
  );
};

export default ColorList;