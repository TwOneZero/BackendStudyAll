import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5, 0.25)
  }
}));

export default function TagsInput({ ...props }) {
  const classes = useStyles();
  const { selectedTags, placeholder, tags, setTags, ...other } = props;
  const [inputValue, setInputValue] = React.useState("");
//   const [, setTags] = React.useState([]);


  useEffect(() => {
    setTags(tags);
  }, [setTags, tags]);
  
//   useEffect(() => {
//     selectedTags(selectedItem);
//   }, [selectedItem, selectedTags]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const newSelectedItem = [...tags];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setTags(newSelectedItem);
      setInputValue("");
    }
    if (
      tags.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setTags(tags.slice(0, tags.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...tags];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setTags(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...tags];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setTags(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={tags}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder
          });
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: tags.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: event => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}
