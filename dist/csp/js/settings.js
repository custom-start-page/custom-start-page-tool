"use strict";

// import React, { Component } from "react";
// import { render } from "react-dom";
// import Form from "react-jsonschema-form";
const Form = JSONSchemaForm.default;
const storage = new CustomStartStorage();

async function getSchema() {
    return await fetch('/api/schema')
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then(out => {
            return out;
        }).catch(err => {
            throw err;
        });
}

const del = () => {
    storage.delete();
    window.parent.reloadPreview();
};

const canReloadStartPage = () => {
    return typeof window.parent.reloadStartPage !== 'undefined';
};

async function renderForm(schema, originalFormData) {
    let formData = null;

    const formAction = function () {
        console.error('No action set.');
    };

    const submit = data => {
        formData = data.formData;
        storage.set(formData);
        console.log(formData);

        formAction();

        if (canReloadStartPage())
            window.parent.reloadStartPage();
    };

    const save = () => { };
    ReactDOM.render(
        React.createElement(Form, { schema: schema, formData: originalFormData, onSubmit: submit, },
            React.createElement("footer", { className: "sticky-footer" },
                React.createElement("div", { className: "container " },
                    React.createElement("div", { class: "pull-right" },
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-primary",
                                onClick: () => {
                                    formAction = save;
                                }
                            }, "Save" + (canReloadStartPage() ? " and update" : "")),
                        "\xA0",
                        canReloadStartPage() == false
                            ? React.createElement(
                                "a",
                                { href: "/", target: "_blank", class: "btn btn-warning" },
                                "View start page")
                            : ""
                    )))), document.getElementById("form"));
}

async function render() {
    try
    {
        const schema = await getSchema();
        const originalFormData = await storage.get();

        renderForm(schema, originalFormData)
    }
    catch
    {
        ReactDOM.render("No schema 😢.",
            document.getElementById("form")
        );
    }
}

render();
