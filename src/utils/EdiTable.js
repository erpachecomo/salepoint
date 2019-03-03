import {
    Button,
    Divider,
    Table,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    message
  } from "antd";
  import React from "react";
  import "../styles.css";
  
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      nombre: `Producto ${i}`,
      cantidad: 32,
      descripcion: `Awesome product ${i}`
    });
  }
  
  const FormItem = Form.Item;
  const EditableContext = React.createContext();
  
  const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
  
  const EditableFormRow = Form.create()(EditableRow);
  
  class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === "number") {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {form => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [
                        {
                          required: true,
                          message: `Please Input ${title}!`
                        }
                      ],
                      initialValue: record[dataIndex]
                    })(this.getInput())}
                  </FormItem>
                ) : (
                  restProps.children
                )}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
  }
  
  class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data, editingKey: "" };
      this.columns = [
        {
          title: "Nombre producto",
          dataIndex: "nombre",
          width: "25%",
          editable: true
        },
        {
          title: "Cantidad",
          dataIndex: "cantidad",
          width: "15%",
          editable: true
        },
        {
          title: "Descripcion",
          dataIndex: "descripcion",
          width: "40%",
          editable: true
        },
        {
          title: "Acciones",
          dataIndex: "acciones",
          render: (text, record) => {
            const editable = this.isEditing(record);
            return (
              <div>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <Button
                          shape="circle"
                          icon="check"
                          ghost
                          type="primary"
                          onClick={() => this.save(form, record.key)}
                        />
                      )}
                    </EditableContext.Consumer>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Estas seguro que quieres cancelar?"
                      onConfirm={() => this.cancel(record.key)}
                      placement="topRight"
                      okText="Si, cancelar"
                      cancelText="No, seguir editando"
                    >
                      <Button type="danger" shape="circle" icon="close" ghost />
                    </Popconfirm>
                  </span>
                ) : (
                  <div className="icons-list">
                    <Button
                      type="primary"
                      shape="circle"
                      icon="edit"
                      ghost
                      onClick={() => this.edit(record.key)}
                    />
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Estas seguro que quieres eliminar este producto?"
                      onConfirm={() => this.delete(record.key)}
                      placement="topRight"
                      okText="Si, eliminar"
                      cancelText="No, cancelar"
                    >
                      <Button type="danger" shape="circle" icon="delete" ghost />
                    </Popconfirm>
                  </div>
                )}
              </div>
            );
          }
        }
      ];
    }
    isEditing = record => record.key === this.state.editingKey;
  
    cancel = () => {
      this.setState({ editingKey: "" });
    };
    delete = () => {
      console.log("Deleted");
      message.success("Deleted");
    };
    save(form, key) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row
          });
          this.setState({ data: newData, editingKey: "" });
        } else {
          newData.push(row);
          this.setState({ data: newData, editingKey: "" });
        }
        message.success("Guardado");
      });
    }
  
    edit(key) {
      this.setState({ editingKey: key });
    }
  
    render() {
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell
        }
      };
  
      const columns = this.columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === "cantidad" ? "number" : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record)
          })
        };
      });
  
      return (
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
        />
      );
    }
  }
  
  export default EditableTable;
  