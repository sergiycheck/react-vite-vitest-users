import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../src/components/App/App';
import { TestProvider } from './test-helpers';

describe('home', () => {
  it(`renders home component with three items, 
      clicks and checks if items are changed`, () => {
    render(
      <TestProvider>
        <App />
      </TestProvider>
    );

    const initialShownElementsLength = 3;
    const threeUserItems = screen.getAllByTestId('user_item');
    expect(threeUserItems).toHaveLength(initialShownElementsLength);

    fireEvent.click(screen.getByRole('button', { name: 'View all' }));

    const elementsLengthAfterClick = 10;
    const tenUserItems = screen.getAllByTestId('user_item');
    expect(tenUserItems).toHaveLength(elementsLengthAfterClick);
  });

  it(`checks if first user item from list has values in elements`, () => {
    render(
      <TestProvider>
        <App />
      </TestProvider>
    );
    const [firstItem] = screen.getAllByTestId('user_item');
    const firstItemImg = firstItem.querySelector('[data-testid="user_img"]');
    const firstItemName = firstItem.querySelector('[data-testid="user_name"]');
    const firstItemEmail = firstItem.querySelector(
      '[data-testid="user_email"]'
    );

    expect(firstItemImg).toBeInTheDocument();
    expect(firstItemName).toBeInTheDocument();
    expect(firstItemEmail).toBeInTheDocument();
  });

  it(`checks if modal opens for first user from the list, 
      checks elements and closes it`, async () => {
    render(
      <TestProvider>
        <App />
      </TestProvider>
    );
    const [firstItem] = screen.getAllByTestId('user_item');

    fireEvent.click(
      firstItem.querySelector('[data-testid="view_user_item_btn"]')!
    );

    const userModalItem = await screen.findByTestId('user_modal_item');
    expect(userModalItem).toBeInTheDocument();

    expect(screen.getByTestId('user_modal_img')).toBeInTheDocument();
    expect(screen.getByTestId('user_modal_name')).toBeInTheDocument();
    expect(screen.getByTestId('user_modal_phone')).toBeInTheDocument();
    expect(screen.getByTestId('user_modal_url')).toBeInTheDocument();
    expect(screen.getByTestId('user_modal_email')).toBeInTheDocument();
    expect(screen.getByTestId('user_modal_send_msg_btn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close_modal_btn'));

    expect(userModalItem).not.toBeVisible();
  });
});
