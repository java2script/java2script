package com.falstad.circuit;

interface Editable {
    EditInfo getEditInfo(int n);
    void setEditValue(int n, EditInfo ei);
}