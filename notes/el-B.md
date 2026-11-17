# Greek translation notes — Part B

## Scope and deliverables

`el-extra-pages.json` contains 425 English-to-Greek entries from the updated repository: Employer Guide, Capabilities, Worker Application, Privacy, Terms, and the 25 service names rendered by the ContactForm dropdown. Each entry has exactly `file`, `en`, and `el` fields.

`BlogPage.jsx` and blog content were intentionally omitted as requested; blog content is to remain English-only. The updated `CountriesPage.jsx` uses the shared translation-key system and localized country data rather than hard-coded page copy. It therefore has no literal Part B strings to extract; its keys and data belong to the shared locale/content translation work, not this hard-coded-string JSON.

Email addresses and URLs are omitted as standalone translation text and left for the source to preserve. Text containing embedded links or email addresses is split around those protected spans. Dynamic values and inline markup are likewise kept outside the `en` and `el` fragments. Placeholder examples, including names, phone formats, and file formats, remain unchanged where they are values rather than translatable copy.

## Legal review required

The Privacy Policy and Terms of Service are legal texts and should be reviewed by a qualified lawyer before publication. Their source governing-law provisions remain with Bangladesh, including the Dhaka court jurisdiction stated in the Terms. No Greek or EU legal adaptation was made. Where the English Privacy Policy itself mentions GDPR/EU/EEA rights, that source wording was translated faithfully rather than added to or modified.

## Terminology and quality checks

Greek uses the project's recruitment terminology, including «στρατολόγηση προσωπικού», «πρόσληψη», and «αποστολή εργαζομένων». The translation avoids terminology that could imply a regulated Greek employment-placement, temporary-work, or worker-posting service. Protected company names, people, technical acronyms, contact details, and the stated office address remain unchanged.

The delivered JSON was parsed and checked for the expected three-key schema and page order; the blog page, email addresses, and URLs are absent from `en`; source numbers are preserved; and the banned Greek terms are absent. This is a Part B data deliverable only; it does not modify the page components or replace the earlier Part A localization files.
