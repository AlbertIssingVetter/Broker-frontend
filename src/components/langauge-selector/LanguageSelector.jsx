import React from "react";
import {getLang, langList} from "../../lang/t";
import {FormControl, MenuItem, Select} from "@material-ui/core";

export default class LanguageSelector extends React.Component {

    handleOnChangeLang = (e) => {
        localStorage.setItem('lang', e.target.value);
        window.location.reload()
    }

    render() {
        return (
            <div className='language-selector'>
                <FormControl variant="outlined">
                    <Select
                        onChange={this.handleOnChangeLang}
                        value={getLang()}>
                        {
                            Object.keys(langList).map((lang) =>
                                (
                                    <MenuItem value={langList[lang].name}>
                                        <img className='language-selector-image' src={langList[lang].icon} alt={langList[lang].name}/>
                                        {langList[lang].name}
                                    </MenuItem>
                                )
                            )
                        }
                    </Select>
                </FormControl>
            </div>
        );
    }
}
