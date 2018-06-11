import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import ItemCard from '../../components/ItemCard';

const addItemMutation = gql`
    mutation addItem(
        $title: String!
        $description: String!
        $imageurl: String!
        $tags: [String]!
        $created: String!
        $available: Boolean!
        $itemowner: String!
        $borrower: String
    ) {
        addItem(
            title: $title
            description: $description
            imageurl: $imageurl
            tags: $tags
            created: $created
            available: $available
            itemowner: $itemowner
            borrower: $borrower
        ) {
            title
            description
        }
    }
`;

const placeholderData = {
    imageurl: 'http://lorempixel.com/output/technics-q-c-400-400-6.jpg',
    title: 'Headphones',
    itemowner: {
        id: 'DYjqnBenm2Xf2TzpczVUfgpYcZa2',
        bio: 'Test Item, please ignore',
        fullname: 'Mack',
        email: 'mackenzie@redacademy.com'
    },
    created: new Date(),
    tags: ['tag1'],
    description: 'test'
};

const tags = [
    { id: 1, tag: 'Electronics' },
    { id: 2, tag: 'Household Items' },
    { id: 3, tag: 'Musical Instruments' },
    { id: 4, tag: 'Physical Media' },
    { id: 5, tag: 'Recreational Equipment' },
    { id: 6, tag: 'Sporting Goods' },
    { id: 7, tag: 'Tools' }
];

export default class Share extends Component {
    state = {
        stepIndex: 0,
        selectedTags: [],
        itemCardData: {
            imageurl: '',
            title: '',
            itemowner: {
                id: 1,
                bio: '',
                fullname: '',
                email: ''
            },
            created: new Date(),
            tags: [],
            description: ''
        }
    };

    onSubmit = values => {
        console.log('Form was submitted', values);
    };

    validate = (...args) => {
        console.log('Validating:', args);
    };

    required = value => (value ? undefined : 'Required');

    handleNext = () => {
        const { stepIndex } = this.state;
        if (stepIndex < 3) {
            this.setState({ stepIndex: stepIndex + 1 });
        }
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    handleFilter(tag) {
        const { selectedTags } = this.state;
        if (selectedTags.indexOf(tag) > -1) {
            selectedTags.splice(selectedTags.indexOf(tag), 1);
            this.setState({ selectedTags: [...selectedTags] });
        } else {
            this.setState({ selectedTags: [...selectedTags, tag] });
        }
    }

    renderStepActions(step) {
        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label="Next"
                    disableTouchRipple
                    disableFocusRipple
                    primary
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disableTouchRipple
                        disableFocusRipple
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const { stepIndex } = this.state;
        return (
            <div
                style={{
                    display: 'flex'
                }}
            >
                <div style={{ padding: 15 }}>
                    <ItemCard itemsData={this.state.itemCardData} />
                </div>
                <Form
                    onSubmit={values => this.onSubmit(values)}
                    validate={this.validate.bind(this)}
                    render={({ handleSubmit, values }) => (
                        <Mutation mutation={addItemMutation}>
                            {(addItem, { data }) => (
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        handleSubmit(values);
                                        addItem({
                                            variables: {
                                                ...values,
                                                created: new Date(),
                                                available: true,
                                                tags: this.state.selectedTags.map(
                                                    tag => tag.id.toString()
                                                ),
                                                itemowner:
                                                    'eEvh1WUF5nb5eeUksUQb3Ph0kOU2'
                                            }
                                        });
                                    }}
                                >
                                    <Stepper
                                        activeStep={stepIndex}
                                        linear={false}
                                        orientation="vertical"
                                    >
                                        <Step>
                                            <StepButton
                                                onClick={() =>
                                                    this.setState({
                                                        stepIndex: 0
                                                    })
                                                }
                                            >
                                                Add an Image
                                            </StepButton>
                                            <StepContent>
                                                <label name="image">
                                                    We live in a visual culture.
                                                    Upload an image of the item
                                                    you're sharing.
                                                </label>
                                                <Field
                                                    name="imageurl"
                                                    validate={this.required.bind(
                                                        this
                                                    )}
                                                >
                                                    {({ input, meta }) => {
                                                        meta.touched &&
                                                            meta.error && (
                                                            <span>
                                                                {meta.error}
                                                            </span>
                                                        );
                                                        return (
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                {...input}
                                                                required
                                                            />
                                                        );
                                                    }}
                                                </Field>
                                                {this.renderStepActions(0)}
                                            </StepContent>
                                        </Step>
                                        <Step>
                                            <StepButton
                                                onClick={() =>
                                                    this.setState({
                                                        stepIndex: 1
                                                    })
                                                }
                                            >
                                                Add a Title & Description
                                            </StepButton>
                                            <StepContent>
                                                <p className="title-blurb">
                                                    Folks need to know what
                                                    you're sharing. Give them a
                                                    clue by adding a title &
                                                    description.
                                                </p>
                                                <Field
                                                    name="title"
                                                    validate={this.required.bind(
                                                        this
                                                    )}
                                                >
                                                    {({ input, meta }) => {
                                                        meta.touched &&
                                                            meta.error && (
                                                            <span>
                                                                {meta.error}
                                                            </span>
                                                        );
                                                        // console.log(input);
                                                        return (
                                                            <TextField
                                                                floatingLabelText="Title"
                                                                floatingLabelFixed
                                                                required
                                                                {...input}
                                                                hintText="Title"
                                                                fullWidth
                                                                underlineFocusStyle={{
                                                                    color:
                                                                        'blue'
                                                                }}
                                                            />
                                                        );
                                                    }}
                                                </Field>

                                                <Field
                                                    name="description"
                                                    validate={this.required.bind(
                                                        this
                                                    )}
                                                >
                                                    {({ input, meta }) => {
                                                        meta.touched &&
                                                            meta.error && (
                                                            <span>
                                                                {meta.error}
                                                            </span>
                                                        );
                                                        return (
                                                            <TextField
                                                                required
                                                                {...input}
                                                                floatingLabelText="Description"
                                                                floatingLabelFixed
                                                                fullWidth
                                                                hintText="Description"
                                                                multiLine
                                                                rows={4}
                                                                className="textField"
                                                            />
                                                        );
                                                    }}
                                                </Field>
                                                {this.renderStepActions(1)}
                                            </StepContent>
                                        </Step>

                                        <Step>
                                            <StepButton
                                                onClick={() =>
                                                    this.setState({
                                                        stepIndex: 2
                                                    })
                                                }
                                            >
                                                Categorize your Item
                                            </StepButton>
                                            <StepContent>
                                                <label name="tags">
                                                    To share an item, you'll add
                                                    it to our list of
                                                    categories. You can select
                                                    multiple categories.
                                                </label>
                                                <Field
                                                    name="tags"
                                                    validate={this.required.bind(
                                                        this
                                                    )}
                                                >
                                                    {({ input }) => (
                                                        <SelectField
                                                            multiple
                                                            value="tags"
                                                            hintText="Select Category Tags"
                                                            className="select-area"
                                                            {...input}
                                                            onChange={(
                                                                event,
                                                                index,
                                                                value
                                                            ) =>
                                                                this.handleFilter(
                                                                    value[0]
                                                                )
                                                            }
                                                        >
                                                            {tags.map(tag => (
                                                                <MenuItem
                                                                    insetChildren
                                                                    key={
                                                                        tag.id
                                                                    }
                                                                    value={tag}
                                                                    primaryText={
                                                                        tag.tag
                                                                    }
                                                                    checked={
                                                                        this.state.selectedTags.indexOf(
                                                                            tag
                                                                        ) > -1
                                                                    }
                                                                />
                                                            ))}
                                                        </SelectField>
                                                    )}
                                                </Field>
                                                {this.renderStepActions(2)}
                                            </StepContent>
                                        </Step>
                                        <Step>
                                            <StepButton
                                                onClick={() =>
                                                    this.setState({
                                                        stepIndex: 3
                                                    })
                                                }
                                            >
                                                Confirm Things!
                                            </StepButton>
                                            <StepContent>
                                                <label>
                                                    Great! If you're happy with
                                                    everything, tap the button.
                                                </label>
                                                <button type="submit">
                                                    Submit
                                                </button>
                                                {this.renderStepActions(3)}
                                            </StepContent>
                                        </Step>
                                    </Stepper>
                                </form>
                            )}
                        </Mutation>
                    )}
                />
            </div>
        );
    }
}
