---
id: legal-markup-language
title: Legal Markup Language
sidebar_label: Legal Markup Language
slug: /lml
---

A digital contract markup language is used to express the structure of the contract document conceptually, rather than visually as is the case with most contract document forms. The conceptual structure includes: 
1. the natural language text of the document;
2. textual formatting (e.g. headings, quotations, and text presentation); and 
3. the structured data that exists within the contract.

Various forms of markup language exist for different domains, such as HTML for web pages, MathML for integrating mathematical notation and formulae into web pages, and Markdown for rich text documents. The notable difference is that such a digital contract markup language enables contract specific functionality to be embedded within the natural language. These may take various forms, but at a basic level include:

Template markup:

```
{{#clause clauseName}}
Upon the signing of this Agreement, {{buyer}} shall pay {{amount}} to {{seller}}.
{{/clause}}
```

Textual representation of an instance of a template (a clause):

```
Upon the signing of this Agreement, Alice shall pay 100.00 GBP to Bob.
```

Structured data representation of the data for a clause:

```
{
   "$class": "org.legalschema.ExampleContract",
    "contractId": "1f3a4329-6a99-4c2d-86b5-febe0815823a",
    "buyer": {
        "$class": "org.accordproject.contract.Party",
        "partyId": "Alice" 
    },
    "seller": {
        "$class": "org.accordproject.contract.Party",
        "partyId": "Bob" 
    },
    "amount": {
        "$class": "org.accordproject.money.MonetaryAmount", "value": 100.00,
        "currencyCode": "GBP"
    } 
}
```

**Formatting** - {{#clause clauseName}} to define a clause as a component within a contract and ## to indicate a heading for the clause.

**Parameters** - Syntactically distinct elements within the text of the document such as {{rate}} which operates as a placeholder to indicate that some value for the interest rate should be entered. These, together, comprise the structured data model for the document.

**Expressions and code** - Expressions such as `{{% monthlyPaymentFormula (loanAmount,rate,loanDuration) %}}` enable calculations to be performed within the document using the other parameters in a manner similar to spreadsheets.

## More information

For more details on using the markup language please refer to the [technical guide](https://docs.accordproject.org/docs/markup-preliminaries.html).