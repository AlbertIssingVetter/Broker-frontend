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
            <div className={'language-selector ' + (this.props.className? this.props.className : '')}>
                <FormControl variant="outlined">
                    <Select
                        onChange={this.handleOnChangeLang}
                        value={getLang()}>
                        {
                            Object.keys(langList).map((lang) =>
                                (
                                    <MenuItem key={langList[lang].name} value={langList[lang].name}>
                                        <img className='language-selector-image' src={langList[lang].icon} alt={langList[lang].name}/>
                                        <div className='language-selector-name'>{langList[lang].name}</div>
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
